import yargs from 'yargs';

export interface CliArgs {
  loadExtension: string[]
}

export const args: CliArgs = {
  loadExtension: []
}
