import React, { useEffect } from "react";
import { SearchBarInput } from "../../../ui/Input/UsersBarInput";
import { Contact } from "./Contact";
import UserButtonShimmer from "../../Skeleton/Shimmer";
import type { AppDispatch, RootState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../../../store/Contacts/contactThunk";

const Contacts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { contacts, status, error, selectedConversation } = useSelector(
    (state: RootState) => state.contact
  );

  const activeId = selectedConversation?.id ?? null;

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <>
      {/* Header */}
      <div className="p-4">
        <h2 className="mb-4  md:block">Contacts</h2>
        <SearchBarInput />
      </div>

      {/* Scroll Area */}
      <div className="relative flex-1">
        <div className="p-2">
          {status === "loading" ? (
            Array.from({ length: 5 }).map((_, i) => (
              <UserButtonShimmer key={i} />
            ))
          ) : status === "failed" ? (
            <p className="text-red-500">{error}</p>
          ) : (
            contacts.map((contact) => (
              <Contact
                key={contact.id}
                {...contact}
                isActive={activeId === contact.id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Contacts;
