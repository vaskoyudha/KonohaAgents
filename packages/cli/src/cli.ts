import { Command } from 'commander'
import rootPackageJson from '../../../package.json' with { type: 'json' }
import { registerValidateCommand } from './commands/validate'

type RootPackage = {
  version?: string
}

const pkg = rootPackageJson as RootPackage

export const program = new Command()

program
  .name('konoha')
  .description('KonohaAgents CLI')
  .version(pkg.version ?? '0.0.0')

registerValidateCommand(program)

program.command('list').description('List available agents (stub)')
program.command('search').description('Search agents (stub)')
program.command('sync').description('Sync agents (stub)')

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  void program.parseAsync(process.argv)
}
