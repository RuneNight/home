import { CommandPermissionLevel } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { CxxString, int32_t } from "bdsx/nativetype";
import * as fs from "fs";

var a = true;
var masterData: {
  pl: string;
  Name: string;
  x: int32_t;
  y: int32_t;
  z: int32_t;
}[] = [];
let jsonObject: any;
let x: any;
let y: any;
let z: any;
let cmd: string;
let jsi: object;
let pl: any;
let Homelength = 5;
let b: boolean;
command.register("sethome", "home set").overload(
  (p, o, op) => {
    x = o.getEntity()?.getPosition().x;
    y = o.getEntity()?.getPosition().y;
    z = o.getEntity()?.getPosition().z;
    pl = o.getEntity()?.getName();
    try {
      jsonObject = readJson();
    } catch (e) {
      console.log(e);
    }
    try {
      jsi =
        jsonObject.masterData.filter((item: any) => {
          if (item.pl == pl) return true;
        }) || {};
    } catch (e) {}
    for (const i in jsi) {
      if (i.length > Homelength) {
        b = true;
      } else {
        b = false;
      }
    }
    if (
      x != undefined &&
      y != undefined &&
      x != undefined &&
      pl != undefined &&
      b == true
    ) {
      var data = {
        pl: pl,
        Name: p.name,
        x: x,
        y: y,
        z: z,
      };
      masterData.push(data);
      let masterData2: string = JSON.stringify({ masterData }, null, " ");
      fs.writeFileSync("./home.json", masterData2);
    }
  },
  {
    name: CxxString,
  }
);

command.register("gohome", "home go").overload(
  (p, o, op) => {
    const actor = o.getEntity();
    try {
      jsonObject = readJson();
    } catch (e) {
      console.log(e);
    }
    try {
      jsi =
        jsonObject.masterData.filter((item: any) => {
          if (item.Name == p.name) return true;
        }) || {};
      a = false;
    } catch (e) {}
    for (const i in jsi) {
      actor?.runCommand(
        "tp @s" + jsi[i].x + " " + jsi[i].y + " " + jsi[i].z + " "
      );
    }
    if (a) {
      //   actor?.runCommand(cmd);
    }
  },
  {
    name: CxxString,
  }
);

command.register("rmhome", "home remove").overload(
  (p, o, op) => {
    const actor = o.getEntity();
    try {
      jsonObject = readJson();
    } catch (e) {
      console.log(e);
    }
    try {
      jsi =
        jsonObject.masterData.filter((item: any) => {
          if (item.Name == p.name) return false;
        }) || {};
      a = false;
    } catch (e) {}
    if (a) {
      // actor?.runCommand(cmd);
    }
  },
  {
    name: CxxString,
  }
);

command.register("listhome", "home remove").overload(
  (p, o, op) => {
    const actor = o.getEntity();
    try {
      jsonObject = readJson();
    } catch (e) {
      console.log(e);
    }
    try {
      jsi =
        jsonObject.masterData.filter((item: any) => {
          return false;
        }) || {};
      a = false;
    } catch (e) {}
    for (const i in jsi) {
      cmd =
        `tellraw @s{"rawtext":[{"text":"§l§fName: ` +
        jsi[i].Name +
        `--- x` +
        jsi[i].x +
        `/y` +
        jsi[i].y +
        `/z` +
        jsi[i].z +
        `"}]}`;
    }
    if (a) {
      // actor?.runCommand(cmd);
    }
  },
  {
    name: CxxString,
  }
);

command.register("maxhome", "home remove").overload(
  (p, o, op) => {
    Homelength = p.int;
  },
  {
    int: int32_t,
  }
);

command.find("maxhome").signature.permissionLevel =
  CommandPermissionLevel.Operator;
const readJson = function () {
  return JSON.parse(fs.readFileSync("./home.json", "utf8"));
};
