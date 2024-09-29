import { startCase } from "lodash";
import { auth } from "@clerk/nextjs/server";

import { OrgControl } from "@/app/(platform)/(dashboard)/organization/[organizationId]/_components/org-control";

export const generateMetadata = async () => {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "organization"),
  };
};

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
