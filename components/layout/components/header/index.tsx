import { Bars3Icon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Layout as AntdLayout, Button, Alert } from 'antd'

import Breadcrumb from './breadcrumb'
import ProfileButton from './profile'
import { useMediaQuery } from '@/libs/hooks/useMediaQuery'
import ReportButton from './report'

interface IHeaderProps {
  showDrawer: () => void
}

export default function Header({ showDrawer }: IHeaderProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <>
      <AntdLayout.Header className="bg-jindalBlue h-auto px-0 py-4 leading-none">
        <div className="flex items-center justify-between max-w-[92%] mx-auto py-1">
          {/* hamburger menu */}
          <Button
            className="text-white-45 hover:text-white-88"
            icon={<Bars3Icon width={24} />}
            type="text"
            onClick={showDrawer}
          />

          {/* profile */}
          <ProfileButton />
        </div>
        {isMobile ? (
          <div className="flex justify-end max-w-[92%] mx-auto py-1">
            <ReportButton />
          </div>
        ) : (
          <div className="flex items-center justify-between max-w-[92%] mx-auto py-1">
            <Breadcrumb />
            <ReportButton />
          </div>
        )}
      </AntdLayout.Header>
      {process.env.NEXT_PUBLIC_DEV_ENV === "true" && (
        <Alert
          className="flex text-center text-red-700 text-xl justify-center"
          message={
            <div className="flex justify-center items-center gap-2">
              <ExclamationTriangleIcon width={36} />
              <b>AMBIENTE DI TEST</b>
            </div>
          }
          type="error"
        />
      )}
    </>
  )
}
