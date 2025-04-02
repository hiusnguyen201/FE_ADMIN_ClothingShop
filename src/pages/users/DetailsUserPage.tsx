import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { Heading } from "@/components/Heading";
import { Tag } from "@/components/Tag";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { FlexBox } from "@/components/FlexBox";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Spinner } from "@/components/spinner";
import { EditUserPermissionsPage, EditUserSettingsPage } from "@/pages/users/tabs";
import { UserGuardChildrenProps } from "@/guards/user/UserExistsGuard";

enum TABS {
  SETTINGS = "settings",
  PERMISSIONS = "permissions",
  USERS = "users",
}

const tabs = [
  {
    value: TABS.SETTINGS,
    element: EditUserSettingsPage,
  },
  {
    value: TABS.PERMISSIONS,
    element: EditUserPermissionsPage,
  },
];

export function DetailsUserPage({ user, checkExistLoading }: UserGuardChildrenProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo(() => {
    const path = location.pathname.split("/").pop();
    if (Object.values(TABS).includes(path as TABS)) {
      return path as TABS;
    }
    return TABS.SETTINGS;
  }, [location]);

  return (
    <ContentWrapper>
      <FlexBox size="large">
        <FlexBox>
          <Link to={"/users"} className="flex items-center gap-2 text-sm">
            <ArrowLeft size={16} />
            <span>Back to Users</span>
          </Link>
          {checkExistLoading && (
            <div className="flex items-center justify-center w-full">
              <Spinner />
            </div>
          )}

          {!checkExistLoading && (
            <Heading
              title={user?.name || "User"}
              description={
                <div className="flex items-center gap-1">
                  <span>User ID</span>
                  <Tag>{user?.id || 1}</Tag>
                </div>
              }
            />
          )}
        </FlexBox>

        {!checkExistLoading && user && (
          <FlexBox size="large">
            <Tabs
              value={activeTab}
              onValueChange={(val) => {
                navigate(`/users/${user.id}/${val}`);
              }}
              className="flex flex-col gap-6 w-full"
            >
              <TabsList className="bg-[transparent] gap-6 border-b w-full justify-start rounded-none h-auto p-0">
                {tabs.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className="relative capitalize transition-all py-3 px-1 data-[state=active]:bg-[transparent] hover:text-primary data-[state=active]:text-primary border-0 data-[state=active]:shadow-none rounded-none "
                  >
                    {item.value}
                    {activeTab === item.value && (
                      <div className="absolute h-[2px] bg-primary w-full inset-x-0 bottom-0"></div>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div>
                {tabs.map((item) => (
                  <TabsContent key={item.value} value={item.value} className="py-4 mt-0">
                    {item.element({ user })}
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </FlexBox>
        )}
      </FlexBox>
    </ContentWrapper>
  );
}
