import Editor from "@/components/editor";
import LatestFeed from "@/components/feeds/latest-feed";
import Header from "@/components/header";
import HomeRightbar from "@/components/rightbars/home-rightbar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import { auth } from "@/server/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      <div className="w-full">
        <Header heading="Home" />
        <main>
          <Tabs defaultValue="latest">
            {session?.user && (
              <>
                <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
                <Editor user={session.user} />
              </>
            )}
            <TabsContent value="latest" className="m-0">
              <LatestFeed />
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <HomeRightbar />
    </>
  );
}
