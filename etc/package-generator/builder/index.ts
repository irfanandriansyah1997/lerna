import { red } from 'chalk';
import { exec } from 'child_process';
import inquirer, { QuestionCollection } from 'inquirer';

import { BASIC_COMMAND, HEADING_CLI } from '../constant';
import { ICommandCLI } from '../interface';

/**
 * Package Builder
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.03.15
 */
export class PackageBuilder {
  private static instance: PackageBuilder;

  private promptOption: QuestionCollection[] = BASIC_COMMAND;

  constructor() {
    this.execute = this.execute.bind(this);
    this.execShellScript = this.execShellScript.bind(this);
  }

  /**
   * Generate Heading
   * @returns {void}
   */
  private generateHeading(): void {
    // eslint-disable-next-line no-console
    HEADING_CLI.forEach((item) => console.log(item));
  }

  /**
   * Exec Shell Script
   * @param {ICommandCLI} commandCli - command cli parameter
   * @returns {void}
   */
  execShellScript({ description, folderName, packageName }: ICommandCLI): void {
    const paramShell = [
      `PACKAGE_NAME="${packageName}"`,
      `FOLDER_NAME="${folderName}"`,
      description !== `` ? `DESCRIPTION="${description}"` : undefined
    ]
      .filter((item) => item !== undefined)
      .join(` `);
    const event = exec(
      `${paramShell} sh etc/package-generator/shell-script/generator.sh`
    );

    if (event.stdout)
      event.stdout.on(`data`, (data) => {
        // eslint-disable-next-line no-console
        console.log(data.toString());
      });
  }

  /**
   * Execute Builder
   * @returns {void}
   */
  execute(): void {
    const { execShellScript, generateHeading } = this;
    generateHeading();

    inquirer
      .prompt(this.promptOption)
      .then(({ folderName, packageName, ...param }) => {
        if (folderName !== ``) {
          const response: ICommandCLI = {
            ...(param as ICommandCLI),
            folderName
          };
          response.folderName = folderName;
          response.packageName = packageName !== `` ? packageName : folderName;

          execShellScript(response);
        } else {
          throw new Error(`folder name param is empty`);
        }
      })
      .catch((e) => {
        if (e instanceof Error) {
          // eslint-disable-next-line no-console
          console.log(red(`[ERROR] - ${e.message}`));
        }
      });
  }

  /**
   * Get Instance
   * @returns {PackageBuilder}
   */
  private static getInstance(): PackageBuilder {
    if (PackageBuilder.instance === undefined) {
      PackageBuilder.instance = new PackageBuilder();
    }

    return PackageBuilder.instance;
  }

  /**
   * Create Asset
   * @returns {void}
   */
  public static create(): void {
    PackageBuilder.getInstance().execute();
  }
}
