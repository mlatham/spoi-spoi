function SeedRandom(state1, state2)
{
    this.mod1 = 4294967087;
    this.mul1 = 65539;
    this.mod2 = 4294965887;
    this.mul2 = 65537;

    if(typeof state1 != "number")
    {
        state1 =+ new Date();
    }
    
    if(typeof state2 != "number")
    {
        state2 = state1;
    }

    this.state1 = state1 % (this.mod1 - 1) + 1;
    this.state2 = state2 % (this.mod2 - 1) + 1;
}

SeedRandom.prototype.next = function(limit)
{
    this.state1 = (this.state1 * this.mul1) % this.mod1;
    this.state2 = (this.state2 * this.mul2) % this.mod2;

    if(this.state1 < this.limit 
        && this.state2 < this.limit 
        && this.state1 < this.mod1 % this.limit 
        && this.state2 < this.mod2 % this.limit)
    {
        return random(limit);
    }

    return (this.state1 + this.state2) % limit;
}