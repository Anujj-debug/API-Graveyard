import SubmitAPIForm from "@/features/registry/components/submit-api-form";

export default function SubmitAPIPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Contribute a listing
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Submit an API to the directory
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Add useful APIs to the platform with clear metadata so others can browse, compare, and review them quickly.
        </p>
      </div>
      <SubmitAPIForm />
    </div>
  );
}