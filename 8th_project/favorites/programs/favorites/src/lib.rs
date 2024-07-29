use anchor_lang::prelude::*;

declare_id!("4vUqZy8qT5FT9yw3JEHHPKgasRXnkgWGGo4wsqPvUEsq");

#[program]
pub mod favorites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
