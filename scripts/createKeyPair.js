import fs from 'fs'
import { web3 } from '@project-serum/anchor'

const account = web3.Keypair.generate()

const data = JSON.stringify(account)

fs.writeFileSync('./src/keypair.json', data)