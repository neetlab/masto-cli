#!/usr/bin/env node
import { Masto } from "masto";
import yargs from "yargs";

yargs.command(
  "token",
  "Get token from a Mastodon instance",
  yargs =>
    yargs
      .option("uri", {
        alias: "u",
        required: true,
        type: "string",
        describe: "URI of your Mastodon instance"
      })
      .option("email", {
        alias: "m",
        required: true,
        type: "string",
        describe: "Email address of your account"
      })
      .option("password", {
        alias: "p",
        required: true,
        type: "string",
        describe: "Password of your account"
      }),

  async ({ uri, email, password }) => {
    const masto = await Masto.login({ uri });

    try {
      const token = await masto.fetchAccessToken({
        grant_type: "password",
        username: email,
        password
      });

      console.log(token.access_token);
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
).argv;
