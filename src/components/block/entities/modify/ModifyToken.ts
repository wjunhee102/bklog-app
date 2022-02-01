import { ModifyData, ModifyGenericTypes } from "./type";

export class ModifyDataToken<T extends ModifyGenericTypes> {
  private _id: string = "";
  private _command: T["command"] = "update";
  private _set: T["set"] = "block";
  private _payload: T["payload"] = null;
  
  constructor(props: ModifyData<T>) {
    this.init(props);
  }

  private init({ id, command, set, payload }: ModifyData<T>) {
    this._id = id;
    this._command = command;
    this._set = set;
    this._payload = payload;
  }

  get id(): string {
    return this._id;
  }

  get command(): T["command"] {
    return this._command;
  }

  get set(): T["set"] {
    return this._set;
  }

  get payload(): T["payload"] {
    return this._payload;
  }

  public setCommand(command: T["command"]) {
    this._command = command;
    return this;
  }

  public updatePayload(payload: T["payload"]) {
    this._payload = Object.assign({}, this._payload, payload);
  }

  get getData(): ModifyData<T> {
    return {
      id: this._id,
      command: this._command,
      set: this._set,
      payload: this._payload
    }
  }

}