export default class ApplicationConfig {
  private static readonly port = process.env.DB_PORT || '3306';

  private static readonly dbName = process.env.DB_NAME || 'momsitter';

  private static readonly user = process.env.DB_USER || 'momsitterAPI';

  private static readonly password = process.env.DB_PASSWORD || 'dev!api2020&*';

  private static readonly dialect = process.env.DB_DIALECT || 'mysql';

  private static readonly pool_max = process.env.DB_POOL_MAX || '';

  private static readonly pool_min = process.env.DB_POOL_MIN || '';

  private static readonly idleTimeoutMillis = process.env.DB_IDEL_TIMEOUT || '';

  private static readonly logging = process.env.SQL_LOG || true;

  private static readonly timezone = process.env.DB_TIMEZONE || 'Asia/Seoul';

  private static readonly application_specific_config_table = '';

  private static readonly write = process.env.WRITE_DB || 'momsitter-app-dev.cbycsob2qplw.ap-northeast-2.rds.amazonaws.com';

  private static readonly read_1 = process.env.READ_DB_1 || 'momsitter-app-dev-read-reaplica-1.cbycsob2qplw.ap-northeast-2.rds.amazonaws.com';

  private static readonly read_2 = process.env.READ_DB_2;

  private static readonly read_3 = process.env.READ_DB_3;

  private static readonly read_4 = process.env.READ_DB_4;

  private static readonly read_5 = process.env.READ_DB_5;

  private static readonly charset = process.env.DB_CHARSET || 'utf8mb4';

  private static readonly nodeEnv = process.env.NODE_ENV;

  public static getNodeEnv(): string | undefined {
    return this.nodeEnv;
  }

  public static getDBConfig() {
    return {
      name: this.getDbName(),
      user: this.getUser(),
      password: this.getPassword(),
      dialect: this.getDialect(),
      timezone: this.getTimezone(),
      read1: this.getRead1(),
      read2: this.getRead2(),
      read3: this.getRead3(),
      read4: this.getRead4(),
      read5: this.getRead5(),
      write: this.getWrite(),
      charset: this.getCharset(),
      port: this.getPort(),
      poolMin: this.getPoolMin(),
      poolMax: this.getPoolMax(),
    };
  }

  private static getPort(): string {
    return this.port;
  }

  private static getDbName(): string {
    return this.dbName;
  }

  private static getUser(): string {
    return this.user;
  }

  private static getPassword(): string {
    return this.password;
  }

  private static getDialect(): string {
    return this.dialect;
  }

  private static getPoolMax(): string {
    return this.pool_max;
  }

  private static getPoolMin(): string {
    return this.pool_min;
  }

  private static getIdleTimeoutMillis(): string {
    return this.idleTimeoutMillis;
  }

  private static getLogging(): string | boolean {
    return this.logging;
  }

  private static getTimezone(): string {
    return this.timezone;
  }

  private static getApplicationSpecificConfigTable(): string {
    return this.application_specific_config_table;
  }

  private static getWrite(): string {
    return this.write;
  }

  private static getRead1(): string {
    return this.read_1;
  }

  private static getRead2(): string | undefined {
    return this.read_2;
  }

  private static getRead3(): string | undefined {
    return this.read_3;
  }

  private static getRead4(): string | undefined {
    return this.read_4;
  }

  private static getRead5(): string | undefined {
    return this.read_5;
  }

  private static getCharset(): string {
    return this.charset;
  }
}
