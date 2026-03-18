import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarShortcut,
} from "../ui/menubar";
import { useState } from "react";

export function MenubarPage() {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showUrls, setShowUrls] = useState(false);
  const [profile, setProfile] = useState("benoit");

  return (
    <ComponentPage name="Menubar" description="A horizontal menu bar with dropdown menus, keyboard navigation, submenus, and checkbox/radio items. Built on Radix UI Menubar.">
      <Section title="Basic" description="A desktop-style menubar with File, Edit, View, and Profiles menus.">
        <ExampleRow label="Full menubar">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab <MenubarShortcut>Ctrl+T</MenubarShortcut></MenubarItem>
                <MenubarItem>New Window <MenubarShortcut>Ctrl+N</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Share</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Email</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                    <MenubarItem>Airdrop</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Print <MenubarShortcut>Ctrl+P</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut></MenubarItem>
                <MenubarItem>Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut <MenubarShortcut>Ctrl+X</MenubarShortcut></MenubarItem>
                <MenubarItem>Copy <MenubarShortcut>Ctrl+C</MenubarShortcut></MenubarItem>
                <MenubarItem>Paste <MenubarShortcut>Ctrl+V</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
                  Show Bookmarks
                </MenubarCheckboxItem>
                <MenubarCheckboxItem checked={showUrls} onCheckedChange={setShowUrls}>
                  Show Full URLs
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem>Reload <MenubarShortcut>Ctrl+R</MenubarShortcut></MenubarItem>
                <MenubarItem>Force Reload <MenubarShortcut>Ctrl+Shift+R</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Profiles</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup value={profile} onValueChange={setProfile}>
                  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                  <MenubarRadioItem value="pedro">Pedro</MenubarRadioItem>
                  <MenubarRadioItem value="sarah">Sarah</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem>Edit Profiles...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}
