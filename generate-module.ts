import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter module name: ", (moduleName) => {
  if (!moduleName) {
    console.error("❌ Module name is required");
    rl.close();
    return;
  }

  const lower = moduleName.toLowerCase();
  const capitalized = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

  const baseDir = path.join(process.cwd(), "src", "modules", lower);

  if (fs.existsSync(baseDir)) {
    console.error("❌ Module already exists");
    rl.close();
    return;
  }

  fs.mkdirSync(baseDir, { recursive: true });

  const files: Record<string, string> = {
    [`${lower}.repository.ts`]: repositoryTemplate(capitalized, lower),
    [`${lower}.services.ts`]: serviceTemplate(capitalized, lower),
    [`${lower}.controller.ts`]: controllerTemplate(capitalized, lower),
    [`${lower}.route.ts`]: routeTemplate(capitalized, lower),
    [`${lower}.zod.ts`]: validationTemplate(capitalized),
  };

  Object.entries(files).forEach(([file, content]) => {
    fs.writeFileSync(path.join(baseDir, file), content.trim());
  });

  console.log(`✅ Module "${lower}" generated successfully`);
  rl.close();
});

/* ================== TEMPLATES ================== */

function repositoryTemplate(name: string, lower: string): string {
  return `
import prisma from "../../db/connectDB";
import { Prisma } from "../../../generated/prisma/client";

class ${name}Repository {
  async findAll${name}s() {
    return prisma.${lower}.findMany();
  }

  async create${name}(data: Prisma.${name}CreateInput) {
    return prisma.${lower}.create({ data });
  }

  async find${name}ById(id: string) {
    return prisma.${lower}.findUnique({ where: { id } });
  }

  async update${name}(id: string, data: Prisma.${name}UpdateInput) {
    return prisma.${lower}.update({ where: { id }, data });
  }

  async delete${name}(id: string) {
    return prisma.${lower}.delete({ where: { id } });
  }
}

export default ${name}Repository;
`;
}

function serviceTemplate(name: string, lower: string): string {
  return `
import AppError from "../../errors/appError";
import { status } from "../../utils/status";
import { Prisma } from "../../../generated/prisma/client";
import ${name}Repository from "./${lower}.repository";

class ${name}Service {
  constructor(private ${lower}Repo: ${name}Repository) {}

  async create${name}(data: Prisma.${name}CreateInput) {
    return this.${lower}Repo.create${name}(data);
  }

  async findAll${name}s() {
    return this.${lower}Repo.findAll${name}s();
  }

  async find${name}ById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid ${lower} Id", status.NOT_FOUND);
    }
    return this.${lower}Repo.find${name}ById(id);
  }

  async update${name}(id: string, data: Prisma.${name}UpdateInput) {
    if (!id) {
      throw new AppError("Enter a valid ${lower} Id", status.NOT_FOUND);
    }
    return this.${lower}Repo.update${name}(id, data);
  }

  async delete${name}(id: string) {
    return this.${lower}Repo.delete${name}(id);
  }
}

export default ${name}Service;
`;
}

function controllerTemplate(name: string, lower: string): string {
  return `
import { status } from "../../utils/status";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import ${name}Service from "./${lower}.services";
import { Request, Response } from "express";

class ${name}Controller {
  constructor(private ${lower}Service: ${name}Service) {}

  create${name} = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.${lower}Service.create${name}(newData);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "${name} created successfully",
      data: result,
    });
  });

  getAll${name}s = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.${lower}Service.findAll${name}s();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "${name}s fetched successfully",
      data: result,
    });
  });

  get${name}ById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.${lower}Service.find${name}ById(id as string);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "${name} fetched successfully",
      data: result,
    });
  });

  update${name} = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.${lower}Service.update${name}(id as string, req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "${name} updated successfully",
      data: result,
    });
  });

  delete${name} = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.${lower}Service.delete${name}(id as string);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "${name} deleted successfully",
      data: result,
    });
  });
}

export default ${name}Controller;
`;
}

function routeTemplate(name: string, lower: string): string {
  return `
import { Router } from "express";
import ${name}Controller from "./${lower}.controller";
import ${name}Service from "./${lower}.services";
import ${name}Repository from "./${lower}.repository";
import zodValidate from "../../middleware/zodValidation";
import { create${name}ZodSchema, update${name}ZodSchema } from "./${lower}.zod";

const router = Router();

const ${lower}Repository = new ${name}Repository();
const ${lower}Service = new ${name}Service(${lower}Repository);
const ${lower}Controller = new ${name}Controller(${lower}Service);

router.post("/", zodValidate(create${name}ZodSchema), ${lower}Controller.create${name});
router.get("/", ${lower}Controller.getAll${name}s);
router.get("/:id", ${lower}Controller.get${name}ById);
router.put("/:id", zodValidate(update${name}ZodSchema), ${lower}Controller.update${name});
router.delete("/:id", ${lower}Controller.delete${name});

export const ${name}Routes = router;
`;
}

function validationTemplate(name: string): string {
  return `
import { z } from "zod";

export const create${name}ZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const update${name}ZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
`;
}
