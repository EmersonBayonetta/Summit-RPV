import { STORAGE_KEYS } from "@/constants";
import { storage } from "@/storage/storage";
import type { DisabilityType, PublicUser, Session, User } from "@/types";
import { createId } from "@/utils/id";

const readUsers = (): User[] => storage.read<User[]>(STORAGE_KEYS.users, []);
const writeUsers = (users: User[]) => storage.write(STORAGE_KEYS.users, users);

const toPublic = ({ senha: _senha, ...user }: User): PublicUser => user;

export interface SignUpInput {
  nome: string;
  email: string;
  senha: string;
  deficiencia: DisabilityType;
}

export interface SignInInput {
  email: string;
  senha: string;
}

export const userService = {
  list: (): PublicUser[] => readUsers().map(toPublic),

  findByEmail: (email: string): User | undefined =>
    readUsers().find((user) => user.email.toLowerCase() === email.trim().toLowerCase()),

  findById: (id: string): PublicUser | null => {
    const user = readUsers().find((item) => item.id === id);
    return user ? toPublic(user) : null;
  },

  signUp: (input: SignUpInput): PublicUser => {
    const users = readUsers();
    const exists = users.some(
      (user) => user.email.toLowerCase() === input.email.trim().toLowerCase(),
    );
    if (exists) {
      throw new Error("Já existe uma conta cadastrada com este e-mail.");
    }
    const user: User = {
      id: createId("user"),
      nome: input.nome.trim(),
      email: input.email.trim().toLowerCase(),
      senha: input.senha,
      deficiencia: input.deficiencia,
      criadoEm: new Date().toISOString(),
    };
    writeUsers([...users, user]);
    return toPublic(user);
  },

  signIn: ({ email, senha }: SignInInput): PublicUser => {
    const user = userService.findByEmail(email);
    if (!user) {
      throw new Error("Não encontramos uma conta com este e-mail. Faça seu cadastro.");
    }
    if (user.senha !== senha) {
      throw new Error("Senha incorreta. Tente novamente.");
    }
    return toPublic(user);
  },

  update: (id: string, changes: Partial<Pick<User, "nome" | "email" | "deficiencia">>): PublicUser => {
    const users = readUsers();
    const index = users.findIndex((user) => user.id === id);
    if (index < 0) throw new Error("Usuário não encontrado.");

    const nextEmail = changes.email?.trim().toLowerCase() ?? users[index].email;
    const emailTaken = users.some((user) => user.id !== id && user.email === nextEmail);
    if (emailTaken) throw new Error("Este e-mail já está em uso por outra conta.");

    const updated: User = {
      ...users[index],
      ...changes,
      nome: changes.nome?.trim() ?? users[index].nome,
      email: nextEmail,
    };
    users[index] = updated;
    writeUsers(users);
    return toPublic(updated);
  },
};

export const sessionService = {
  get: (): Session | null => storage.read<Session | null>(STORAGE_KEYS.session, null),
  save: (userId: string) =>
    storage.write<Session>(STORAGE_KEYS.session, {
      userId,
      criadoEm: new Date().toISOString(),
    }),
  clear: () => storage.remove(STORAGE_KEYS.session),
};
