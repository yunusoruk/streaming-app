'use client'

import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';
import { FC, useEffect, useState } from 'react';

interface ModalProviderProps { }

const ModalProvider: FC<ModalProviderProps> = ({ }) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        // it shows modal loaded we can show it on client
    }, [])

    // we should never render modal when wqe are on serverside rendering

    if (!isMounted) {
        return null
    }

    return (
        <>
            <AuthModal />
            <UploadModal />
        </>
    );
}
export default ModalProvider;