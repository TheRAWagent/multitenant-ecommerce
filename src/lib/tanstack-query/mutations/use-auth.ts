import { CognitoIdentityProviderClient, ConfirmSignUpCommand, InitiateAuthCommand, ResendConfirmationCodeCommand, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"
import { useMutation } from "@tanstack/react-query"
import Cookies from 'js-cookie';
import { toast } from "sonner";

import { cognitoConfig } from "@/lib/config"
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
  const router = useRouter();

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
      var inOneHour = new Date(new Date().getTime() + (response.AuthenticationResult?.ExpiresIn ?? 3600) * 1000);
      Cookies.set('AccessToken', response.AuthenticationResult?.AccessToken!, { expires: inOneHour });
      Cookies.set("IdToken", response.AuthenticationResult?.IdToken!, { expires: inOneHour });
      Cookies.set("RefreshToken", response.AuthenticationResult?.RefreshToken!, { expires: inOneHour });
      router.push("/");
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

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: async ({ username }: { username: string }) => {
      const client = new CognitoIdentityProviderClient(cognitoConfig);
      const command = new ResendConfirmationCodeCommand({
        ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        Username: username
      });
      return await client.send(command);
    },
    onSuccess: () => {
      toast.success("Resent Otp");
    },
    onError: () => {
      toast.error("Failed to send Otp");
    }
  })
}
