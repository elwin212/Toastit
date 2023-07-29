import { generateReactHelpers } from '@uploadthing/react/hooks';

import type { OurFileRouter } from '@/app/api/uploadthing/core';

const uloadFiles = generateReactHelpers<OurFileRouter>();
// function that let user upload files
export const { uploadFiles } = generateReactHelpers<OurFileRouter>();
//export default uploadFiles;