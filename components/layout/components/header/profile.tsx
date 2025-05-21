import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Avatar, Badge, Button, Dropdown, Switch, Typography } from "antd";

import { useSession } from "@/libs/hooks/useSession";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "@/global-states/user";
import { updateUserOut } from "@/libs/api/methods/admin";
import { Fragment } from "react";

export  const urlAllegati = ()=>{
  if(process.env.NEXT_PUBLIC_DEV_ENV){
    return "https://minio.braincontentnetwork.net/jindal-dev/"
  } else{
    return "https://content.jbds.brainplatform.cloud/uploads/"
  }
}

export default function ProfileButton() {
  const router = useRouter();
  const { data, logout, out_office } = useSession();
  const username = data.full_name || data.email || "Caricamento...";
  const [user, setUser] = useRecoilState(userState)

  const onChange = (checked: boolean) => {
    updateUserOut({supertoken_uid: user.id, out_office: checked});
    setUser({...user,out_office: checked})
    
  };

  const profileItems = [
    {
      key: "1",
      label: (
        <div className="flex gap-2 mb-0 items-center m-0">
          <Typography.Paragraph className="mb-0 " >Out of Office</Typography.Paragraph>
          <Switch value={user.out_office}  onChange={onChange} />
        </div>
      ),
      permissions: ["supervisor","alternate","rda_L2"]
    },
    {
      key: "2",
      label: "Profilo",
      onClick: () => router.push("/dashboard/profilo"),
    },
    {
      key: "3",
      label: "Manuale App",
      onClick: () => window.open(`${urlAllegati()}Manuale_d_uso_-_App_Magazzino.pdf`),
      /* onClick: () => window.open("https://content.jbds.brainplatform.cloud/uploads/Manuale_d_uso_-_App_Magazzino.pdf"), */
    },
    { key: "4", label: "Log-out", onClick: logout },
  ].filter(item => 
    (item.permissions ?? []).length > 0 ? item.permissions?.find((role) => data.roles?.includes(role)) : true);

  const OutOfOffice = ((data.roles?.includes("supervisor")|| data.roles?.includes("alternate")) && out_office==true ) ? Badge : Fragment
  const isBadge = OutOfOffice === Badge;
  return (
    
    <Dropdown
      className="flex gap-2 items-center h-[42px]"
      menu={{ items: profileItems }}
      trigger={["click"]}
    >
      
      <Button ghost type="primary"  className="border-white-25">
        <OutOfOffice {...(isBadge ? { count: " ", color: "red", size: "small" } : {})} >
          <Avatar size="small" className="bg-white-25">
            {username.charAt(0).toUpperCase()}
          </Avatar>
        </OutOfOffice > 
        <Typography.Text className="text-white">{username}</Typography.Text>

        <ChevronDownIcon width={16} className="text-white" />
      </Button>
    </Dropdown>
    
  );
}
