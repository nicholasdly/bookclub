import { currentUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Badge from "~/app/_components/badge";
import { CalendarIcon, FollowersIcon } from "~/app/_components/icons";
import Feed from "~/app/_components/posts/feed";
import { Avatar, AvatarImage } from "~/app/_components/shadcn-ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/app/_components/shadcn-ui/tabs";
import { api } from "~/trpc/server";  
import { type RouterOutputs } from "~/trpc/shared";
import { type NotUndefined } from "~/utils/data";

interface ProfileProps {
  params: {
    username: string,
  },
}

interface ProfileSectionProps {
  profileUser: NotUndefined<RouterOutputs["users"]["get"]>;
  isOwner: boolean;
}

export async function generateMetadata({ params: { username } }: ProfileProps): Promise<Metadata> {
  const user = await api.users.get.query({ username });
  const title = user
    ? `${user.firstName} ${user.lastName} (@${user.username}) - Bookclub`
    : "Error 404 - Bookclub";

  return { title };
}

export default async function Profile({ params: { username } }: ProfileProps) {
  const profileUser = await api.users.get.query({ username });
  if (!profileUser) notFound();
  
  const user = await currentUser();
  const isOwner = user != null && user.id === profileUser.id;

  return (
    <main>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 my-8 px-4">
        <Sidebar profileUser={profileUser} isOwner={isOwner} />
        <Primary profileUser={profileUser} isOwner={isOwner} />
      </div>
    </main>
  );
}

function Sidebar({ profileUser, isOwner }: ProfileSectionProps) {
  return (
    <section className="flex flex-col gap-4 md:max-w-64 lg:max-w-72">
      <div className="flex items-center md:items-start md:flex-col gap-3">
        <Avatar className="w-24 h-24 md:w-full md:h-auto border-2 border-stone-400">
          <AvatarImage src={profileUser.imageUrl} alt={`${profileUser.username}'s avatar`} />
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-bold text-2xl">
              {profileUser.firstName} {profileUser.lastName}
            </span>
            <Badge size="lg" type={profileUser.type} />
          </div>
          <span className="text-xl text-muted-foreground">
            @{profileUser.username}
          </span>
        </div>
      </div>
      {profileUser.bio.length > 0 && (
        <div className="flex flex-col gap-3">
          <p>{profileUser.bio}</p>
          {/* {isOwner && (
            <Button variant="outline" size="lg" className="h-8">
              Edit profile
            </Button>
          )} */}
        </div>
      )}
      <div>
        <div className="flex items-center mb-2">
          <FollowersIcon className="w-5 h-5 text-muted-foreground mr-1.5" />
          <span className="text-muted-foreground text-sm">
            <span className="text-foreground font-bold">100</span> followers
            <span className="mx-1">·</span>
            <span className="text-foreground font-bold">100</span> following
          </span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <CalendarIcon className="w-5 h-5 mr-1.5" />
          <span className="text-sm">
            Joined {dayjs(profileUser.createdAt).format("MMMM YYYY")}
          </span>
        </div>
      </div>
    </section>
  );
}

async function Primary({ profileUser }: ProfileSectionProps) {
  return (
    <section className="flex flex-col gap-4 grow">
      <Tabs defaultValue="posts">
        <TabsList className="w-full">
          <TabsTrigger value="posts" className="w-full">Posts</TabsTrigger>
          <TabsTrigger value="replies" className="w-full">Replies</TabsTrigger>
          <TabsTrigger value="likes" className="w-full">Likes</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="flex flex-col gap-2">
            <Feed userId={profileUser.id} type="posts" />
          </div>
        </TabsContent>
        <TabsContent value="replies">
          <div className="flex flex-col gap-2">
            <Feed userId={profileUser.id} type="replies" />
          </div>
        </TabsContent>
        <TabsContent value="likes">
          <div className="flex flex-col gap-2">
            <Feed type="global" />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}