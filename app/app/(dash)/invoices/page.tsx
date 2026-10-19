import type { Metadata } from "next";
import Link from "next/link";
import { InvoiceList } from "@/components/portal/Invoices";
import { EmptyState, Kpi, Note, PageHeader } from "@/components/system/Page";
import { textLink } from "@/components/system/ui";
import { money } from "@/lib/money";
import { billingSettings, listInvoices } from "@/lib/portal/data";
import { appBase, requireUser } from "@/lib/system/session";

export const metadata: Metadata = { title: "Invoices" };

/* Invoices (from Jadeed Marketing): Sameer sees every client's; a client owner sees their own
   (client staff can't). */
export default async function InvoicesPage() {
  const [user, base] = await Promise.all([requireUser(), appBase()]);

  if (user.role === "client" && user.clientId) {
    const invoices = (await listInvoices(user.clientId)).filter((invoice) => invoice.status !== "draft");
    return (
      <>
        <PageHeader title="Invoices" description="Fees only on jobs your customers completed and paid. Pay by bank transfer, then drop the screenshot here." />
        <InvoiceList invoices={invoices} side="client" isAdmin={false} base={base} />
      </>
    );
  }
  if (user.role !== "admin") return <EmptyState icon="lock" title="Not available" body="Invoices are for Sameer and each client's owner." />;

  const [invoices, billing] = await Promise.all([listInvoices(), billingSettings()]);
  const sum = (status: string) => invoices.filter((i) => i.status === status).reduce((total, i) => total + i.totalCents, 0);
  return (
    <>
      <PageHeader title="Invoices" description="Drafted from paid jobs (automatically on the 1st of each month, or from a client's page), sent, then marked paid when the money arrives." />
      {!billing ? (
        <Note className="mb-4">
          Add your bank details in{" "}
          <Link href={`${base}/settings`} className={textLink}>
            Settings
          </Link>{" "}
          before sending an invoice.
        </Note>
      ) : null}
      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
        <Kpi label="Waiting for payment" value={money(sum("sent"))} icon="receipt" lime />
        <Kpi label="Drafts to check" value={invoices.filter((i) => i.status === "draft").length} icon="document" />
        <Kpi label="Paid in total" value={money(sum("paid"))} icon="checkCircle" />
      </div>
      <InvoiceList invoices={invoices.filter((i) => i.status !== "void")} side="team" isAdmin base={base} showClient />
    </>
  );
}
