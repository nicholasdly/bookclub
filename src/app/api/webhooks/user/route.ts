import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { env } from "~/env";
import { db } from "~/server/db";
import { posts, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

/**
 * This function is triggered by the Clerk user webhook, and will create, update, or delete
 * a user to our MySQL database based on the webhook message type.
 *
 * https://clerk.com/docs/users/sync-data#add-your-signing-secret-to-your-env-local-file
 * @param req `Request`
 * @returns `Response`
 */
export async function POST(req: Request) {

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  switch (evt.type) {
    // Attempt to add a new row to the users table
    case "user.created": {
      const user = evt.data;

      if (!user.username) {
        return new Response(
          "Failed to insert new user into database: nonexistent username",
          { status: 500 },
        );
      }

      if (!user.email_addresses[0]?.email_address) {
        return new Response(
          "Failed to insert new user into database: nonexistent email",
          { status: 500 },
        );
      }

      const userEmailVerificationStatus =
        user.email_addresses[0].verification?.status;
      if (
        !userEmailVerificationStatus ||
        userEmailVerificationStatus !== "verified"
      ) {
        return new Response(
          "Failed to insert new user into database: unverified email",
          { status: 500 },
        );
      }

      try {
        await db.insert(users).values({
          id: user.id,
          username: user.username,
          email: user.email_addresses[0].email_address,
          firstName: user.first_name,
          lastName: user.last_name,
          imageUrl: user.image_url,
        });
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return new Response(`Failed to insert new user into database: ${err}`, {
          status: 500,
        });
      }

      return new Response(`Sucessfully created user: ${user.id}`, {
        status: 200,
      });
    }

    // Attempt to update a row of the users table
    case "user.updated": {
      const user = evt.data;

      if (!user.username) {
        return new Response(
          "Failed to update user in database: nonexistent username",
          { status: 500 },
        );
      }

      if (!user.email_addresses[0]?.email_address) {
        return new Response(
          "Failed to update user in database: nonexistent email",
          { status: 500 },
        );
      }

      const userEmailVerificationStatus =
        user.email_addresses[0].verification?.status;
      if (
        !userEmailVerificationStatus ||
        userEmailVerificationStatus !== "verified"
      ) {
        return new Response(
          "Failed to update user in database: unverified email",
          { status: 500 },
        );
      }

      try {
        await db
          .update(users)
          .set({
            username: user.username,
            email: user.email_addresses[0].email_address,
            firstName: user.first_name,
            lastName: user.last_name,
            imageUrl: user.image_url,
          })
          .where(eq(users.id, user.id));
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return new Response(`Failed to update user in database: ${err}`, {
          status: 500,
        });
      }

      return new Response(`Sucessfully updated user: ${user.id}`, {
        status: 200,
      });
    }

    // Attempt to delete a row of the users table
    case "user.deleted": {
      const user = evt.data;

      try {
        await db.transaction(async (tx) => {

          if (user.id == null) {
            return new Response(
              "Failed to delete user from database; nonexistent or invalid id",
              { status: 500 },
            );
          }

          await tx.delete(users).where(eq(users.id, user.id));
          await tx.delete(posts).where(eq(posts.userId, user.id));
        });
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return new Response(`Failed to delete user from database: ${err}`, {
          status: 500,
        });
      }

      return new Response(`Sucessfully deleted user: ${user.id}`, {
        status: 200,
      });
    }

    default: {
      return new Response("Clerk webhook message handler does not exist", {
        status: 500,
      });
    }
  }
}
