import React from 'react'
import './AdminSidebar.scss'
import { Sidebar,SubMenu, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faPerson,faClipboard,faInfoCircle,faSignOut } from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
  return (
    <div className='SideBarContainer'>
      <Sidebar className='Sidebar' rtl>
        <div className='platformContainer'>
          <span className='Platform'>تدريبي</span>
          <span className='Name'>عبدالمحسن الحازمي</span>
          <hr className='hLine'/>
        </div>
  <Menu renderExpandIcon={({open}) => <span>{open ? '-' : '+'}</span>}>
    <MenuItem className='MenuItem' icon={<FontAwesomeIcon  icon={faHome} />}>الرئيسية</MenuItem>
    <SubMenu className='MenuItem' label="ادارة المستخدمين" icon={<FontAwesomeIcon  icon={faPerson} />}>
      <MenuItem className='SubMenu'> ادارة المؤسسات </MenuItem>
      <MenuItem className='SubMenu'> ادارة الطلاب </MenuItem>
      <MenuItem className='SubMenu'> ادارة المشرفين </MenuItem>
    </SubMenu>
    <SubMenu className='MenuItem' label="ادارة المحتوى" icon={<FontAwesomeIcon  icon={faClipboard} />}>
    <MenuItem className='SubMenu'>ادارة فرص التدريب</MenuItem>
    <MenuItem className='SubMenu'>ادارة اخبار التدريب</MenuItem>
    </SubMenu>
    <MenuItem className='MenuItem' icon={<FontAwesomeIcon  icon={faInfoCircle} />}> الملف الشخصي </MenuItem>
    <MenuItem className='MenuItem' icon={<FontAwesomeIcon  icon={faSignOut} />}> تسجيل خروج </MenuItem>
  </Menu>
</Sidebar>
    </div>
  )
}

export default AdminSidebar