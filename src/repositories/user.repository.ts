import { usersTable } from "../db/schema";
import { db } from "../dbclient";
import { eq } from "drizzle-orm";

class UserRepository {
  all = async () => await db.select().from(usersTable);

  // TODO: Solucionar el tipado
  save = async (user: any) => {
    await db.insert(usersTable).values(user);
  };

  delete = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id));
  };

  findById = async (id: number) =>
    await db.select().from(usersTable).where(eq(usersTable.id, id)).get();

  findByEmail = async (email: string) =>
    await db.select().from(usersTable).where(eq(usersTable.email, email)).get();
}

export default new UserRepository();
