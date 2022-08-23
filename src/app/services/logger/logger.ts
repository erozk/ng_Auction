
export abstract class ILoggerService {
    public abstract Save( component : string, param : string, log : string) : void
    public abstract Get( component : string, user : string) : void
}