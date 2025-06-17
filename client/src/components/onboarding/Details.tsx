"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { useFieldArray, Control } from "react-hook-form";
import { Trash2 } from "lucide-react";

import { OnboardingValues } from "./forms/OnboardingForm";

import { Label } from "../ui/form/label";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import { Button } from "@/components/ui/buttons/button";

type DetailsProps = {
  control: Control<OnboardingValues>;
};

const Details: React.FC<DetailsProps> = ({ control }) => {
  const [{ question, answer }, setFaqDraft] = useState({
    question: "",
    answer: "",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faq",
  });

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFaqDraft((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    [],
  );

  function isValid() {
    const questionField = question.trim();
    const answerField = answer.trim();

    return (
      questionField.length >= 10 &&
      answerField.length >= 30 &&
      questionField.length <= 50 &&
      answerField.length <= 100
    );
  }

  function handleAdd() {
    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    if (!trimmedQuestion || !trimmedAnswer || !isValid()) return;

    append({ question: trimmedQuestion, answer: trimmedAnswer });
    setFaqDraft({ question: "", answer: "" });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5">
        <div className="space-y-4">
          <Label>Question</Label>
          <Input
            name="question"
            value={question}
            onChange={handleOnChange}
            placeholder="Enter question..."
          />
          <p className="text-sm text-[var(--primary-gray)]">
            Question must be 10 to 50 characters long. Current: (
            {question.trim().length})
          </p>
        </div>
        <div className="space-y-4">
          <Label>Answer</Label>
          <Textarea
            name="answer"
            value={answer}
            onChange={handleOnChange}
            placeholder="Enter answer..."
            className="max-h-36 min-h-36 resize-none"
          />
          <p className="text-sm text-[var(--primary-gray)]">
            Answer must be 30 to 100 characters long. Current: (
            {answer.trim().length})
          </p>
        </div>
        <div className="self-end">
          <Button
            type="button"
            onClick={handleAdd}
            className="px-10"
            disabled={!isValid()}
          >
            Add
          </Button>
        </div>
      </div>

      <div className="h-full max-h-52 space-y-4 overflow-y-auto">
        {fields.map((field, index) => (
          <div key={field.id} className="group relative rounded-md border p-4">
            <div className="mb-1">
              <h2 className="text-sm font-medium">Q: {field.question}</h2>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">A: {field.answer}</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
