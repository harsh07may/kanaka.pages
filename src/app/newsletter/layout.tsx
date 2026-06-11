import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to get the latest chaotic updates straight to your inbox.",
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
