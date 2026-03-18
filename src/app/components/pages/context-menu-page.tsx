import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuShortcut,
} from "../ui/context-menu";
import { useState } from "react";

function TriggerArea({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg border-2 border-dashed"
      style={{
        width: 300,
        height: 160,
        borderColor: "var(--border-subtle)",
        backgroundColor: "var(--secondary-subtle)",
        fontSize: "var(--text-body-sm)",
        color: "var(--color-text-tertiary)",
        fontFamily: "var(--font-family-supreme)",
      }}
    >
      {children}
    </div>
  );
}

export function ContextMenuPage() {
  const [bookmarked, setBookmarked] = useState(true);
  const [person, setPerson] = useState("pedro");

  return (
    <ComponentPage name="Context Menu" description="A menu activated by right-clicking an element. Built on Radix UI Context Menu with keyboard navigation, submenus, and checkbox/radio items.">
      <Section title="Basic" description="Right-click the target area to open the context menu.">
        <ExampleRow label="Right-click here">
          <ContextMenu>
            <ContextMenuTrigger>
              <TriggerArea>Right-click here</TriggerArea>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>Back <ContextMenuShortcut>Ctrl+[</ContextMenuShortcut></ContextMenuItem>
              <ContextMenuItem>Forward <ContextMenuShortcut>Ctrl+]</ContextMenuShortcut></ContextMenuItem>
              <ContextMenuItem>Reload <ContextMenuShortcut>Ctrl+R</ContextMenuShortcut></ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Save As... <ContextMenuShortcut>Ctrl+S</ContextMenuShortcut></ContextMenuItem>
              <ContextMenuItem>Print <ContextMenuShortcut>Ctrl+P</ContextMenuShortcut></ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </ExampleRow>
      </Section>

      <Section title="With Submenus" description="Nested menus for complex option hierarchies.">
        <ExampleRow label="Submenu">
          <ContextMenu>
            <ContextMenuTrigger>
              <TriggerArea>Right-click for submenus</TriggerArea>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>New Tab <ContextMenuShortcut>Ctrl+T</ContextMenuShortcut></ContextMenuItem>
              <ContextMenuItem>New Window</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>Developer Tools</ContextMenuItem>
                  <ContextMenuItem>Task Manager</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Extensions</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked={bookmarked} onCheckedChange={setBookmarked}>
                Show Bookmarks Bar
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuLabel>Team</ContextMenuLabel>
              <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
                <ContextMenuRadioItem value="pedro">Pedro</ContextMenuRadioItem>
                <ContextMenuRadioItem value="sarah">Sarah</ContextMenuRadioItem>
                <ContextMenuRadioItem value="alex">Alex</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}
