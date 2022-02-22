import { ModifyData, UnionModifyGenericType } from "./type";

export class ModifyDataToken<T extends UnionModifyGenericType> {
  private _id: string = "";
  private _type: T["type"] = "";
  private _command: T["command"] = "update";
  private _set: T["set"] = "block";
  private _payload: T["payload"] = {}; 
  private _timestamp: number = 0;
  
  constructor(props: ModifyData<T>) {
    this.init(props);
  }

  private init({ id, type, command, set, payload }: ModifyData<T>) {
    this._id = id;
    this._type = type;
    this._command = command;
    this._set = set;
    this._payload = payload;
    this._timestamp = new Date().getTime();
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get command() {
    return this._command;
  }

  get set() {
    return this._set;
  }

  get payload() {
    return this._payload;
  }

  get timestamp() {
    return this._timestamp;
  }

  public updateTimestamp() {
    this._timestamp = new Date().getTime();
    return this;
  }

  public setCommand(command: T["command"]) {
    this._command = command;
    this.updateTimestamp();
    
    return this;
  }

  public updatePayload(payload: T["payload"]) {
    this._payload = Object.assign({}, this._payload, payload);
    this.updateTimestamp();

    return this;
  }

  public getData(): ModifyData<T> {
    return {
      id: this._id,
      type: this._type,
      command: this._command,
      set: this._set,
      payload: this._payload
    }
  }

}