import { ActionIcon, Kbd, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useHotkeys } from '@mantine/hooks';
import { IconCircleXFilled, IconSearch } from '@tabler/icons-react';
import React, { useRef } from 'react';

export default function SearchInput({ onSearch, ...others }) {
    const ref = useRef();
    const form = useForm({
        initialValues: {
            search: '',
        },
    });
    useHotkeys([['/', () => ref.current && ref.current.focus()]]);

    return (
        <form onSubmit={form.onSubmit(onSearch)}>
            <TextInput
                {...others}
                ref={ref}
                icon={<IconSearch />}
                rightSection={
                    form.values.search ? (
                        <ActionIcon
                            onClick={() => {
                                form.reset();
                                onSearch?.({ search: '' });
                            }}
                        >
                            <IconCircleXFilled />
                        </ActionIcon>
                    ) : (
                        <Kbd>/</Kbd>
                    )
                }
                {...form.getInputProps('search')}
            />
        </form>
    );
}