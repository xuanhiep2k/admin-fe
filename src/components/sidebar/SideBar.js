import './sidebar.css'
import React, {useEffect, useState} from 'react';
import {Menu, ProSidebar, MenuItem,} from "react-pro-sidebar";
import {Link} from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import * as UserService from "../../services/UserService"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import {AccessibilityNew, Apps, DeviceHub, HomeWork, Speed, SyncAlt} from "@material-ui/icons";
import {Handshake} from "@mui/icons-material";

function SideBar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Trang chủ");
    const [img, setImg] = useState();
    const [user, setUser] = useState({});

    const Item = ({title, to, icon, selected, setSelected}) => {
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return (
            <MenuItem active={selected === title} style={{color: colors.grey[100],}} onClick={() => setSelected(title)}
                      icon={icon}>
                <Typography>{title}</Typography>
                <Link to={to}/>
            </MenuItem>
        );
    };
    useEffect(() => {
        UserService.getCurrentUserInfo().then(response => {
            setUser(response.data.data)
            UserService.fetchImageAsBase64(response.data.data.avatar).then((base64String) => {
                setImg(base64String)
            });
        })

        // Get Avatar

    }, [])

    const onClappse = () => {
        setIsCollapsed(!isCollapsed)
        isCollapsed ? (document.getElementById("content").style.marginLeft = "280px") :
            (document.getElementById("content").style.cssText = "margin-left: 90px; transition: width, left, right, 0.3s;")
    }
    return (
        <Box sx={{
            "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`,
            },
            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover": {
                color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
                color: "#6870fa !important",
            },
        }}>
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem onClick={onClappse}
                              icon={isCollapsed ? <SyncAlt/> : undefined}
                              style={{margin: "10px 0 20px 0", color: colors.grey[100],}}>
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMINIS
                                </Typography>
                                <IconButton onClick={onClappse}>
                                    <SyncAlt/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed ? (
                        <Box>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img alt="profile-user" width="150px" height="150px"
                                     src={img} title={JSON.parse(localStorage.getItem("user")).fullName}
                                     style={{cursor: "pointer", borderRadius: "50%"}}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold"
                                            sx={{m: "10px 0 0 0"}}>
                                    {JSON.parse(localStorage.getItem("user")).fullName}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    {JSON.parse(localStorage.getItem("user")).email}
                                </Typography>
                            </Box>
                        </Box>
                    ) : (<Box></Box>)}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item title="Trang chủ" to="/" icon={<HomeOutlinedIcon/>} selected={selected}
                              setSelected={setSelected}/>
                        <Item title="Quản lý ứng dụng" to="/app" icon={<Apps/>} selected={selected}
                              setSelected={setSelected}/>
                        <Item title="Quản lý người dùng" to="/user" icon={<PeopleOutlinedIcon/>}
                              selected={selected}
                              setSelected={setSelected}/>
                        <Item title="Quản lý quyền" to="/role" icon={<AccessibilityNew/>} selected={selected}
                              setSelected={setSelected}/>
                        <Item title="Quản lý chức năng" to="/function" icon={<DeviceHub/>} selected={selected}
                              setSelected={setSelected}/>
                        <Item title="Quản lý phòng ban" to="/department" icon={<HomeWork/>}
                              selected={selected}
                              setSelected={setSelected}/>
                        <Item title="Quản lý đối tác" to="/partner" icon={<Handshake/>}
                              selected={selected}
                              setSelected={setSelected}/>
                        <Item title="Quản lý dashboard" to="/dashboard" icon={<Speed/>}
                              selected={selected}
                              setSelected={setSelected}/>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default SideBar;