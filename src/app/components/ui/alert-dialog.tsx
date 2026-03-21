"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "./utils";

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 50,
          display: "grid",
          width: "100%",
          maxWidth: "min(512px, calc(100vw - 2rem))",
          gap: "var(--space-5)",
          borderRadius: "var(--radius-card, 12px)",
          border: "1px solid var(--border-subtle)",
          padding: "var(--space-7)",
          backgroundColor: "var(--background)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          fontFamily: "var(--font-family-supreme)",
        }}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col", className)}
      style={{ gap: "var(--space-3)" }}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn("flex justify-end", className)}
      style={{ gap: "var(--space-3)", marginTop: "var(--space-3)" }}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={className}
      style={{
        fontSize: "var(--text-h5, 18px)",
        fontWeight: "var(--font-weight-semibold, 600)",
        color: "var(--foreground)",
        fontFamily: "var(--font-family-supreme)",
        lineHeight: 1.4,
      }}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={className}
      style={{
        fontSize: "var(--text-body-sm, 14px)",
        color: "var(--muted-foreground)",
        lineHeight: 1.6,
        fontFamily: "var(--font-family-supreme)",
      }}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn("cursor-pointer", className)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-3) var(--space-6)",
        borderRadius: "var(--radius-button, 8px)",
        fontSize: "var(--text-body-sm, 14px)",
        fontWeight: "var(--font-weight-medium, 500)",
        fontFamily: "var(--font-family-supreme)",
        backgroundColor: "var(--foreground)",
        color: "var(--background)",
        border: "none",
        transition: "opacity 0.15s ease",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn("cursor-pointer", className)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-3) var(--space-6)",
        borderRadius: "var(--radius-button, 8px)",
        fontSize: "var(--text-body-sm, 14px)",
        fontWeight: "var(--font-weight-medium, 500)",
        fontFamily: "var(--font-family-supreme)",
        backgroundColor: "transparent",
        color: "var(--foreground)",
        border: "1px solid var(--border)",
        transition: "background-color 0.15s ease",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--secondary)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
