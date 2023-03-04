import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToClass, Expose } from "class-transformer";

const ValidationMiddleware = (dtoClass: any) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const output: any = plainToClass(dtoClass, req.body);

    validate(output, { skipMissingProperties: true }).then((errors) => {
      // error is an array of validation errors
      if (errors.length > 0) {
        console.log(`From Validation Middleware ${errors}`);

        let errorTexts = Array();
        for (const errorItem of errors) {
          errorTexts = errorTexts.concat(errorItem.constraints);
        }
        res.status(400).send(errorTexts);
        return;
      } else {
        res.locals.input = output;
        next();
      }
    });
  };
};

export default ValidationMiddleware;
