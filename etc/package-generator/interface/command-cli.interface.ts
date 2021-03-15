/**
 * Command CLI Interface
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.03.15
 */
export interface ICommandCLI {
  description: string;
  folderName: string;
  packageName?: string;
}
