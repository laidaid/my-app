import { useAuth } from '@/components/AuthFirebase';
import {
    Avatar,
    Group,
    Menu,
    UnstyledButton,
    createStyles,
    rem,
} from '@mantine/core';
import {
    IconChevronDown,
    IconHeart,
    IconLogout,
    IconMessage,
    IconPlayerPause,
    IconSettings,
    IconStar,
    IconSwitchHorizontal,
    IconTrash,
    IconUser,
} from '@tabler/icons-react';
import React from 'react';
import NextLink from 'next/link';

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
        }`,
        marginBottom: rem(120),
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    user: {
        color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.white,
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    tabs: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    tabsList: {
        borderBottom: '0 !important',
    },

    tab: {
        fontWeight: 500,
        height: rem(38),
        backgroundColor: 'transparent',

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
        },

        '&[data-active]': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.white,
            borderColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[2],
        },
    },
}));

export default function UserMenuDropdown() {
    const { classes, theme, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = React.useState(false);
    const { signOutApp } = useAuth();

    return (
        <Menu
            width={260}
            // position="bottom-start"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
            zIndex={1001}
        >
            <Menu.Target>
                <UnstyledButton
                    className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                    })}
                >
                    <Group spacing={7}>
                        <Avatar radius="xl" size={34} />
                        <IconChevronDown size={rem(12)} stroke={1.5} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    icon={
                        <IconHeart
                            size="0.9rem"
                            color={theme.colors.red[6]}
                            stroke={1.5}
                        />
                    }
                >
                    <NextLink
                        href="/"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        Home
                    </NextLink>
                </Menu.Item>
                <Menu.Item
                    icon={
                        <IconHeart
                            size="0.9rem"
                            color={theme.colors.red[6]}
                            stroke={1.5}
                        />
                    }
                >
                    <NextLink
                        href="/admin"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        Admin
                    </NextLink>
                </Menu.Item>
                <Menu.Item
                    icon={
                        <IconStar
                            size="0.9rem"
                            color={theme.colors.yellow[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Saved posts
                </Menu.Item>
                <Menu.Item
                    icon={
                        <IconMessage
                            size="0.9rem"
                            color={theme.colors.blue[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Your comments
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
                    Account settings
                </Menu.Item>
                <Menu.Item
                    icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}
                >
                    Change account
                </Menu.Item>
                <Menu.Item
                    onClick={signOutApp}
                    icon={<IconLogout size="0.9rem" stroke={1.5} />}
                >
                    Logout
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}
                >
                    Pause subscription
                </Menu.Item>
                <Menu.Item
                    color="red"
                    icon={<IconTrash size="0.9rem" stroke={1.5} />}
                >
                    Delete account
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}