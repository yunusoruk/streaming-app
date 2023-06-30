'use client'

import AuthModal from '@/components/AuthModal';
import SubscribeModal from '@/components/SubscribeModal';
import UploadModal from '@/components/UploadModal';
import { ProductWithPrice } from '@/types';
import { FC, useEffect, useState } from 'react';

interface ModalProviderProps {
    products: ProductWithPrice[]
}

const ModalProvider: FC<ModalProviderProps> = ({ products }) => {
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
            <SubscribeModal products={products} />
        </>
    );
}
export default ModalProvider;