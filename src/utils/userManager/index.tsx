//@ts-nocheck
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

interface UserManagerState {
  username: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  isValid: boolean;
  setIsValid: (value: boolean) => void;
  isBlocked: boolean;
  setIsBlocked: (value: boolean) => void;
  id: number;
  setId: (value: number) => void;
  domain: string;
  setDomain: (value: string) => void;
  orderId: string;
  setOrderId: (value: string) => void;
  paymentToken: string;
  setPaymentToken: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  campaignId: number;
  setCampaignId: (value: number) => void;
  productId: number;
  setProductId: (value: number) => void;
  productInternal: number;
  setProductInternal: (value: number) => void;
  pwd: string;
  setPwd: (value: string) => void;
  userId: number | null;
  setUserId: (value: number | null) => void;
}

export const useStore = create<UserManagerState>(
  devtools(
    persist((set, get) => ({
      username: null,
      setUsername: (value: string) => {
        set(() => ({ username: value }));
      },
      email: null,
      setEmail: (value: string) => {
        set(() => ({ email: value }));
      },
      id: Number,
      setId: (value: number) => {
        set(() => ({ id: value }));
      },
      isValid: null,
      setIsValid: (value: boolean) => {
        set(() => ({ isValid: value }));
      },
      userId: null,
      setUserId: (value: number | null) => {
        set(() => ({ userId: value }));
      },
      isBlocked: null,
      setIsBlocked: (value: boolean) => {
        set(() => ({ isBlocked: value }));
      },
      domain: null,
      setDomain: (value: boolean) => {
        set(() => ({ domain: value }));
      },
      orderId: null,
      setOrderId: (value: string) => {
        set(() => ({ orderId: value }));
      },
      paymentToken: null,
      setPaymentToken: (value: string) => {
        set(() => ({ paymentToken: value }));
      },
      firstName: null,
      setFirstName: (value: string) => {
        set(() => ({ firstName: value }));
      },
      campaignId: Number,
      setCampaignId: (value: number) => {
        set(() => ({ campaignId: value }));
      },
      productId: Number,
      setProductId: (value: number) => {
        set(() => ({ productId: value }));
      },
      productInternal: Number,
      setProductInternal: (value: number) => {
        set(() => ({ productInternal: value }));
      },
      pwd: null,
      setPwd: (value: string) => {
        set(() => ({ pwd: value }));
      },
    }))
  )
);
