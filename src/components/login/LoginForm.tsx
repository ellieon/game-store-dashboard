import {
  Button,
  Card,
  Center,
  Field,
  HStack,
  Input,
  useSteps,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useUser from "../hooks/useUser";

const schema = z.object({
  apiKey: z.string("Api key should not be empty").nonempty(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onLogin: (key: string) => void;
}
const LoginForm = ({ onLogin }: Props) => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [unvalidatedKey, setUnvalidatedKey] = useState("");
  const { error } = useUser({
    apiKey: unvalidatedKey,
    onLogin: onLogin,
  });

  const onSubmit = handleSubmit((data) => setUnvalidatedKey(data.apiKey));

  return (
    <Center>
      <Card.Root>
        <Card.Header>
          <Card.Title>Login</Card.Title>
          <Card.Description>Enter your API key to login</Card.Description>
        </Card.Header>
        <Card.Body>
          <form onSubmit={onSubmit}>
            <HStack align="center">
              <Field.Root invalid={!!formState.errors.apiKey || !!error}>
                <Field.Label>Api Key</Field.Label>
                <Input
                  {...register("apiKey")}
                  width={500}
                  placeholder="Enter your API Key"
                />
                <Field.ErrorText>
                  {formState.errors.apiKey?.message || error}
                </Field.ErrorText>
              </Field.Root>

              <Button type="submit" variant="solid">
                Sign in
              </Button>
            </HStack>
          </form>
        </Card.Body>
      </Card.Root>
    </Center>
  );
};

export default LoginForm;
