import { auth } from '@/lib/auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

export const myFileRouter = {
  profileImage: f({
    'image/jpeg': { maxFileSize: '1MB', maxFileCount: 1 },
    'image/png': { maxFileSize: '1MB', maxFileCount: 1 },
    'image/avif': { maxFileSize: '1MB', maxFileCount: 1 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({
        headers: req.headers,
      });

      if (!session) throw new UploadThingError('Unauthorized');

      return { userId: session.user.id };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.ufsUrl);

      return { uploadedBy: metadata.userId };
    }),
  propertyImages: f({
    'image/jpeg': { maxFileSize: '8MB', maxFileCount: 4 },
    'image/png': { maxFileSize: '8MB', maxFileCount: 4 },
    'image/avif': { maxFileSize: '8MB', maxFileCount: 4 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({
        headers: req.headers,
      });

      if (!session) throw new UploadThingError('Unauthorized');

      return { userId: session.user.id };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.ufsUrl);

      return { uploadedBy: metadata.userId };
    }),

  blogCoverImage: f({
    'image/jpeg': { maxFileSize: '8MB', maxFileCount: 1 },
    'image/png': { maxFileSize: '8MB', maxFileCount: 1 },
    'image/avif': { maxFileSize: '8MB', maxFileCount: 1 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({
        headers: req.headers,
      });

      if (!session) throw new UploadThingError('Unauthorized');

      return { userId: session.user.id };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.ufsUrl);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type MyFileRouter = typeof myFileRouter;
