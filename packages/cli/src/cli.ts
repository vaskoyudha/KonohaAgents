import { Command } from 'commander'
import rootPackageJson from '../../../package.json' with { type: 'json' }
import { registerValidateCommand } from './commands/validate'
import { registerListCommand } from './commands/list'
import { registerSearchCommand } from './commands/search'
import { registerSyncCommand } from './commands/sync'

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
registerListCommand(program)
registerSearchCommand(program)
registerSyncCommand(program)

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  void program.parseAsync(process.argv)
}
