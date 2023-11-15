import SanityClient from "@sanity/client";
import imageUr1Builder from '@sanity/image-url' ;

export  const client = SanityClient({
    projectId: 'mwywb981',
    dataset: 'production',
    apiVersion: '2023-03-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder  = imageUr1Builder(client)

export const urlFor  = (source)=>builder.image(source);