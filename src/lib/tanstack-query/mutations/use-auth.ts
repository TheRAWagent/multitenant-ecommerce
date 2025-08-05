import { CognitoIdentityProviderClient, ConfirmSignUpCommand, InitiateAuthCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"
import { useMutation } from "@tanstack/react-query"
import Cookies from 'js-cookie';
import { toast } from "sonner";

import { cognitoConfig } from "@/lib/config"

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async ({ username, password }: { username: string, password: string }) => {
      const client = new CognitoIdentityProviderClient(cognitoConfig);
      const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password
        },
      })
      toast.loading("Logging in", { id: 'log-in' });
      return await client.send(command);
    },
    onSuccess: (response) => {
      toast.success("Logged In", { id: 'log-in' });
      const expiry = response.AuthenticationResult?.ExpiresIn!;
      Cookies.set('AccessToken', response.AuthenticationResult?.AccessToken!, { expiry: (expiry / 3600) / 24 });
      Cookies.set("IdToken", response.AuthenticationResult?.IdToken!, { expiry: (expiry / 3600) / 24 });
      Cookies.set("RefreshToken", response.AuthenticationResult?.RefreshToken!, { expiry: (expiry / 3600) / 24 });
    },
    onError: () => {
      toast.error("Login Failed", { id: 'log-in' });
    }
  })
}

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async ({ username, password, email }: { username: string, password: string, email: string }) => {
      const client = new CognitoIdentityProviderClient(cognitoConfig);
      const command = new SignUpCommand({
        Username: username,
        Password: password,
        ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        UserAttributes: [
          { Name: 'email', Value: email }
        ]
      })
      toast.loading("Signing Up", { id: 'sign-up' });
      return await client.send(command);
    },
    onSuccess: () => {
      toast.success("Account Created, Please verify account on next page", { id: 'sign-up' });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'sign-up' });
    }
  })
}

export const useVerifyAccountMutation = () => {
  return useMutation({
    mutationFn: async ({ username, code }: { username: string, code: string }) => {
      const client = new CognitoIdentityProviderClient(cognitoConfig);
      const command = new ConfirmSignUpCommand({
        ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        Username: username,
        ConfirmationCode: code,
      })
      toast.loading("Verifying your Account", { id: 'verify' });
      return await client.send(command);
    },
    onSuccess: () => {
      toast.success("Account Verified", { id: 'verify' });
    },
    onError: () => {
      toast.error("Failed to verify account", { id: 'verify' });
    }
  })
}
