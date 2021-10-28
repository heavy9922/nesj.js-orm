import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('PG') private db: Client,
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    return `Hello World! ${apiKey} ${name}`;
  }

  get_employees() {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM employee', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
