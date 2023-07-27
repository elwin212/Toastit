import { generateReactHelpers } from '@uploadthing/react/hooks';

import type { OurFileRouter } from '@/app/api/uploadthing/core';

// function that let user upload files
export const { uploadFiles } = generateReactHelpers<OurFileRouter>();