import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { createWriteStream } from "node:fs";
import { extname, resolve } from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pump = promisify(pipeline);

export async function uploadRoutes(app: FastifyInstance) {
  app.post("/upload", async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // 5MB
      },
    });

    if (!upload) {
      return reply.status(400).send();
    }

    const mimeTypeReg = /^(image|video)\/[a-zA-Z]+/;
    const isValidFileFormat = mimeTypeReg.test(upload.mimetype);

    if (!isValidFileFormat) {
      return reply.status(400).send();
    }

    const fileId = randomUUID();
    const extension = extname(upload.filename);

    const fileName = fileId.concat(extension);

    const writeStream = createWriteStream(
      resolve(__dirname, "../../uploads", fileName),
    );

    await pump(upload.file, writeStream);

    // Não é a melhor maneira para salvar arquivos, porque está salvando ele no disco
    // Melhor maneira seria salvar em serviços específicos para isso
    // Como o Amazon S3, Google Cloud Storage, Azure Blob Storage, CloudFlare R2

    const fullUrl = request.protocol.concat("://").concat(request.hostname);
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();

    return {
      fileUrl,
    };
  });
}
