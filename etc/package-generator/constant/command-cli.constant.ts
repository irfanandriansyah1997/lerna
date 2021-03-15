import { blue } from 'chalk';
import { QuestionCollection } from 'inquirer';

export const BASIC_COMMAND: QuestionCollection[] = [
  {
    message: `Folder Name ${blue(`(base directory from ./_base/)`)} :`,
    name: `folderName`,
    type: `input`
  },
  {
    message: (answer) =>
      `Package Name${
        answer.folderName !== `` ? ` (${answer.folderName})` : ``
      }:`,
    name: `packageName`,
    type: `input`
  },
  {
    message: `Description Package :`,
    name: `description`,
    type: `input`
  }
];
