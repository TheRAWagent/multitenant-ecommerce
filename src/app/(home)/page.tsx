import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="p-4">

    <div className="flex flex-col gap-y-4">
      <div>

      <Button variant={'elevated'}>
        Hello World
      </Button>
      </div>
      <Input placeholder="This is an input" />
      <Progress value={50} />
      <Textarea placeholder={"Hello, this is a textarea"} />
      
    </div>
    </div>
  );
}
