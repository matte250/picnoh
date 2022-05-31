import type { User } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import type { Profile } from './dbTypes';

export const user = writable<User | null>(null);
export const currentProfile = writable<Profile>({
    displayname: "",
    id: "",
    updated_at: new Date(0)
})